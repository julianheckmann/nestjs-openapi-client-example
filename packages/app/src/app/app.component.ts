import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, from, interval, takeUntil } from 'rxjs';
import { ApiClientProvider, ApiClientService } from './api-client.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [ApiClientProvider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  apiClient = inject(ApiClientService);

  destroy$ = new Subject<void>();
  // refetching the token is a bit more than this but this should be fine as an example
  bearerTokenInterval$ = interval(1000).pipe(takeUntil(this.destroy$));

  constructor() {}

  ngOnInit(): void {
    this.bearerTokenInterval$.subscribe((i) => {
      this.apiClient.setBearerToken(`new val ${i}`);
    });

    from(this.apiClient.default.appControllerGetTest()).subscribe({
      next: (result) => {
        console.log(result);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
