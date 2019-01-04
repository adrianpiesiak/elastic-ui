import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  searchByDepartment(dept: string): Observable<any> {
    return this.http
      .request('POST', 'http://localhost:9200/employments/_search', {
        body: {
          query: {
            match: {
              dept_name: dept
            }
          },
          size: 1000,
          sort: [
            {
              'last_name.keyword': 'asc'
            },
            {
              'first_name.keyword': 'asc'
            }
          ]
        }
      })
      .pipe(
        map((data: any) => {
          return data.hits.hits.map(item => item._source);
        })
      );
  }

  searchByName(name: string): Observable<any> {
    return this.http
      .request('POST', 'http://localhost:9200/employees/_search', {
        body: {
          query: {
            match_phrase_prefix: {
              full_name: {
                query: name
              }
            }
          },
          size: 20
        }
      })
      .pipe(
        map((data: any) => {
          return data.hits.hits.map(item => item._source);
        })
      );
  }

  getEmployments(emp_id: number): Observable<any> {
    return this.http
      .post('http://localhost:9200/employments/_search', {
        query: {
          match: {
            emp_no: emp_id
          }
        },
        sort: [{ from_date: 'asc' }],
        size: 1000
      })
      .pipe(
        map((data: any) => {
          return data.hits.hits.map(item => item._source);
        })
      );
  }

  getTopHighestSalaries(): Observable<any> {
    return this.http
      .post('http://localhost:9200/employments/_search', {
        query: {
          match_all: {}
        },
        size: 0,
        aggs: {
          employee_aggr: {
            terms: {
              field: 'emp_no',
              size: 3,
              order: {
                max_salary: 'desc'
              }
            },
            aggs: {
              max_salary: {
                max: { field: 'salary' }
              }
            }
          }
        }
      })
      .pipe(
        map((data: any) => {
          return data.aggregations.employee_aggr.buckets.map(item => {
            return { key: item.key, salary: item.max_salary.value };
          });
        })
      );
  }

  getDepartmentsAgregatedData(): Observable<any> {
    return this.http
      .post('http://localhost:9200/employments/_search', {
        query: {
          match_all: {}
        },
        size: 0,
        aggs: {
          department_aggregation: {
            terms: {
              field: 'dept_name.keyword',
              size: 1000,
              order: {
                max_salary: 'desc'
              }
            },
            aggs: {
              max_salary: {
                max: { field: 'salary' }
              },
              min_salary: {
                min: { field: 'salary' }
              },
              avg_salary: {
                avg: { field: 'salary' }
              }
            }
          }
        }
      })
      .pipe(
        map((data: any) => {
          return data.aggregations.department_aggregation.buckets.map(item => {
            return {
              dept_name: item.key,
              max_salary: item.max_salary.value,
              min_salary: item.min_salary.value,
              avg_salary: item.avg_salary.value
            };
          });
        })
      );
  }

  getEmployeesById(records: any[]): Observable<any> {
    console.log(records);
    const query = { should: [], minimum_should_match: 2 };
    records.forEach(record => {
      query.should.push({
        match: {
          emp_no: record.key
        }
      });

      query.should.push({
        match: {
          salary: record.salary
        }
      });
    });
    return this.http
      .post('http://localhost:9200/employments/_search', {
        query: {
          bool: query
        },
        sort: [
          {
            salary: 'desc'
          }
        ]
      })
      .pipe(
        map((data: any) => {
          return data.hits.hits.map(item => item._source);
        })
      );
  }

  // private handleElasticResponse(response: any): Observable<any> {
  //   if (response.hits && response.hits.hits) {
  //     return Observable.of(response.hits.hits);
  //   }
  // }
}
