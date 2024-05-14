import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { CacheService } from './cache.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [ApiService, CacheService], 
      imports: [HttpClientModule, RouterModule.forRoot([])] 
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have a title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBeDefined();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('fyle-frontend-challenge app is running!');
  });
});
