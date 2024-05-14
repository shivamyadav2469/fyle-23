import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { ApiService } from 'src/app/services/api.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockApiService: any;

  beforeEach(() => {
    // Create a mock ApiService

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [{ provide: ApiService, useValue: mockApiService }]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create this and work this test', () => {
    expect(component).toBeTruthy();
  });



  
});
