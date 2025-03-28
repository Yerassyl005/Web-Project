import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.interface';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <button class="back-button" routerLink="/">
        <i class="fas fa-arrow-left"></i> Back to Books
      </button>

      @if (isLoading) {
        <div class="loading">
          <div class="loader"></div>
          <p>Loading book details...</p>
        </div>
      }

      @if (error) {
        <div class="error">
          <i class="fas fa-exclamation-circle"></i>
          <p>{{ error }}</p>
          <button routerLink="/">Return to Book List</button>
        </div>
      }

      @if (!isLoading && !error && book) {
        <div class="book-detail">
          <div class="book-header">
            <div class="book-cover">
              <img [src]="book.thumbnailUrl || 'assets/images/default-book.png'"
                   [alt]="book.title"
                   (error)="onImageError($event)">
            </div>
            <div class="book-info">
              <h1>{{ book.title }}</h1>
              <div class="meta-info">
                <span><i class="fas fa-calendar"></i> Added: {{ book.addTime | date:'mediumDate' }}</span>
                @if (book.language) {
                  <span>
                    <i class="fas fa-language"></i> {{ book.language }}
                  </span>
                }
                @if (book.year) {
                  <span>
                    <i class="fas fa-clock"></i> {{ book.year }}
                  </span>
                }
              </div>
            </div>
          </div>

          <div class="book-content">
            <section class="description">
              <h2>Description</h2>
              <p>{{ book.shortDescription }}</p>
            </section>

            <div class="additional-info">
              @if (book.hasAudio) {
                <div class="feature">
                  <i class="fas fa-headphones"></i>
                  <span>Audio Available</span>
                </div>
              }
              @if (book.hasFile) {
                <div class="feature">
                  <i class="fas fa-file-pdf"></i>
                  <span>PDF Available</span>
                </div>
              }
            </div>

            @if (book.hasFile || book.hasAudio) {
              <div class="action-buttons">
                @if (book.hasFile) {
                  <a [href]="book.filePath" class="download-button" target="_blank">
                    <i class="fas fa-download"></i> Download PDF
                  </a>
                }
                @if (book.hasAudio) {
                  <a [href]="book.oldFileUrl" class="download-button audio" target="_blank">
                    <i class="fas fa-headphones"></i> Listen Audio
                  </a>
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book?: Book;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBook(+id);
    }
  }

  private loadBook(id: number): void {
    this.isLoading = true;
    this.bookService.getBook(id).subscribe({
      next: (book) => {
        this.book = book;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load book details';
        this.isLoading = false;
        console.error('Error loading book:', err);
      }
    });
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/default-book.png';
  }
}
