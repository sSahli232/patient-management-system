import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Directive({
  selector: '[appIfAdmin]'
})
export class IfAdminDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const isAdmin = this.authService.isAdmin();
    if (isAdmin) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
