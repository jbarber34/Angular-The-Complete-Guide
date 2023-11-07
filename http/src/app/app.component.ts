import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.onError(error);
      }
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService
      .createAndStorePost(postData.title, postData.content)
      .subscribe(
        () => {
          this.onFetchPosts();
        },
        (error) => {
          this.onError(error);
        }
      );
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.onError(error);
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onError(error) {
    this.isFetching = false;
    this.error = error.message;
    console.log(error);
  }

  onHandleError() {
    this.error = null;
  }
}
