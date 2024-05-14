import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from API without caching', () => {
    const mockData = { id: 1, name: 'Test User' };
    const url = 'https://api.github.com/users';
    
    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });

  it('should fetch user details with caching', () => {
    const mockUser = { id: 1, name: 'Test User' };
    const userId = 'testuser';
    const url = `https://api.github.com/users/${userId}`;
    const cachedResponse = service['cache'].get(url);

    // First request should not use cache
    service.getName(userId).subscribe(data => {
      expect(data).toEqual(mockUser);
    });
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    request.flush(mockUser);

    // Second request should use cache
    service.getName(userId).subscribe(data => {
      expect(data).toEqual(mockUser);
    });
    httpMock.expectNone(url); // No new request should be made
  });

  it('should handle HTTP errors', () => {
    const errorResponse = { status: 403, statusText: 'Forbidden' };
    const url = 'https://api.github.com/users';

    service.getData().subscribe({
      error: (error) => {
        expect(error.status).toEqual(403);
        expect(error.statusText).toEqual('Forbidden');
      }
    });

    const request = httpMock.expectOne(url);
    request.flush('Error', errorResponse);
  });
});
