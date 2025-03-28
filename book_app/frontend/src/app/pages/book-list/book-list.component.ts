import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  currentPage: number = 1;
  totalBooks: number = 0;
  pageSize: number = 10;
  searchTerm: string = '';
  ordering: string = '';
  isLoading: boolean = false;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
    console.log('BookListComponent constructed');
  }

  ngOnInit(): void {
    console.log('BookListComponent initialized');
    this.loadBooks();
  }

  loadBooks(): void {
    console.log('Loading books with:', {
      page: this.currentPage,
      search: this.searchTerm,
      ordering: this.ordering
    });
    
    this.isLoading = true;
    this.bookService.getBooks(this.currentPage, this.searchTerm, this.ordering)
      .subscribe({
        next: (response) => {
          console.log('Received books:', response);
          this.books = response.results;
          this.totalBooks = response.count;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading books:', error);
          this.isLoading = false;
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBooks();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadBooks();
  }

  sortBy(field: string): void {
    this.ordering = this.ordering === field ? `-${field}` : field;
    this.loadBooks();
  }

  totalPageCount(): number {
    return Math.ceil(this.totalBooks / this.pageSize);
  }

  navigateToDetail(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/default-book.png'; // Path to your default image
  }
}
