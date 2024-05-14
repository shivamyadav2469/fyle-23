import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TagsComponent } from './tags.component';
import { ApiService } from 'src/app/services/api.service';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;
  let apiServiceStub: Partial<ApiService>;

  beforeEach(() => {
    // Create a stub object for ApiService
    apiServiceStub = {
      getLanguages: () => of({ 'TypeScript': 100, 'JavaScript': 200 })
    };

    TestBed.configureTestingModule({
      declarations: [TagsComponent],
      providers: [{ provide: ApiService, useValue: apiServiceStub }]
    });

    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get languages', () => {
    const repoName = 'exampleRepo';
    const userId = 'exampleUserId';
    
    component.getLanguages(repoName, userId);

    expect(component.languages).toEqual(['TypeScript', 'JavaScript']);
  });
});
