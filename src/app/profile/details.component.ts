import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-details',
  templateUrl: 'details.component.html',
})
export class DetailsComponent {
  account = this.accountService.accountValue;
  profileImage: SafeUrl;
  tempProfileImage: SafeUrl;

  constructor(private accountService: AccountService, private sanitizer: DomSanitizer) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempProfileImage = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfileImage(): void {
    this.profileImage = this.tempProfileImage;
  }
}