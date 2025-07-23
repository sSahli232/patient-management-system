import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';

@Directive({
  selector: '[appAdmin]',
  standalone: true
})
export class IsAdminDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Check if user is admin
    const isAdmin = this.authService.isAdmin();

    if (isAdmin) {
      // Show the element
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Remove the element from the DOM
      this.viewContainer.clear();
    }
  }
}