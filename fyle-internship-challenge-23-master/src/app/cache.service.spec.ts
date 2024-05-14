import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CacheService]
    });
    service = TestBed.inject(CacheService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure no outstanding HTTP requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should fetch data from network when not cached', () => {
    const url = 'https://example.com/data';
    const mockData = { key: 'value' };

    // Call the service method to fetch data (which should trigger an HTTP request)
    service.getCachedOrFetch(url).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    // Expect a single HTTP request
    const req = httpTestingController.expectOne(url);

    // Respond to the request with mock data
    req.flush(mockData);

    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should handle errors when fetching data', () => {
    const url = 'https://example.com/data';
    const errorMessage = 'Error fetching data';

    // Call the service method to fetch data (which should trigger an HTTP request)
    service.getCachedOrFetch(url).subscribe({
      next: () => {
        // Should not reach here if an error occurred
        fail('Expected error');
      },
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe(errorMessage);
      }
    });

    // Expect a single HTTP request
    const req = httpTestingController.expectOne(url);

    // Respond to the request with an error
    req.error(new ErrorEvent('error', { message: errorMessage }));

    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });
});
