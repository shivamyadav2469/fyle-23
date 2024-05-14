import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @Input() repoName: string = '';
  @Input() userId: string = '';
  languages: any;
  constructor(public service: ApiService){}

  ngOnInit(){
    this.getLanguages(this.repoName, this.userId);
  }

  getLanguages(repoName: string, userId: string) {
    this.service.getLanguages(repoName, userId).subscribe(
      (data) => {
        // console.log('languages:', data);
        this.languages = Object.keys(data);
        // console.log(this.languages);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
