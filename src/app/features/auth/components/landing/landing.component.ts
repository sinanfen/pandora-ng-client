import { Component, ViewChild } from '@angular/core';
import { RegisterModalComponent } from './register-modal.component';
import { HttpClientService } from '../../../../core/services/http-client.service';
import { UserRegisterDto } from '../../models/user-register.dto';
import { UserDto } from '../../models/user.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RegisterModalComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  showRegisterModal = false;
  @ViewChild(RegisterModalComponent) registerModal?: RegisterModalComponent;

  constructor(
    private httpService: HttpClientService,
    private toastr: ToastrService
  ) {}

  openRegisterModal() {
    this.showRegisterModal = true;
  }

  closeRegisterModal() {
    if (this.registerModal) {
      this.registerModal.isLoading = false;
      this.registerModal.hide();
    }
  }

  onRegister(user: UserRegisterDto) {
    if (this.registerModal) this.registerModal.isLoading = true;

    this.httpService
      .post<{ success: boolean; data: UserDto; message: string }>(
        'api/Auth/register',
        user
      )
      .subscribe({
        next: (res) => {
          console.log('Registration response:', res);
          this.toastr.success(res.message || 'Kayıt başarılı!', 'Başarılı');
          this.closeRegisterModal();
        },
        error: (err) => {
          console.error('Registration error:', err);
          // Hatalar zaten HttpClientService içinde toastr ile gösteriliyor
          if (this.registerModal) this.registerModal.isLoading = false;
        },
      });
  }
}

class TestimonialSlider {
  private slider: HTMLElement;
  private dots: NodeListOf<HTMLElement>;
  private cards: NodeListOf<HTMLElement>;
  private prevButton: HTMLElement;
  private nextButton: HTMLElement;
  private currentIndex: number = 0;
  private cardWidth: number = 320;
  private cardGap: number = 32; // 2rem gap

  constructor() {
    this.slider = document.querySelector('.testimonial-slider')!;
    this.dots = document.querySelectorAll('.control-dots .dot');
    this.cards = document.querySelectorAll('.testimonial-card');
    this.prevButton = document.querySelector('.slider-nav.prev')!;
    this.nextButton = document.querySelector('.slider-nav.next')!;

    this.initializeSlider();
  }

  private initializeSlider() {
    if (!this.slider) return;
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    this.prevButton.addEventListener('click', () => this.prevSlide());
    this.nextButton.addEventListener('click', () => this.nextSlide());
    setInterval(() => this.nextSlide(), 5000);
    this.updateCardClasses();
    this.updateSliderPosition();
  }

  private goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCardClasses();
    this.updateDots();
    this.updateSliderPosition();
  }

  private prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.updateCardClasses();
    this.updateDots();
    this.updateSliderPosition();
  }

  private nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    this.updateCardClasses();
    this.updateDots();
    this.updateSliderPosition();
  }

  private updateCardClasses() {
    this.cards.forEach((card, i) => {
      card.classList.remove('prev', 'active', 'next');
      if (i === this.currentIndex) {
        card.classList.add('active');
      } else if (
        i ===
        (this.currentIndex - 1 + this.cards.length) % this.cards.length
      ) {
        card.classList.add('prev');
      } else if (i === (this.currentIndex + 1) % this.cards.length) {
        card.classList.add('next');
      }
    });
  }

  private updateDots() {
    this.dots.forEach((dot) => dot.classList.remove('active'));
    if (this.dots[this.currentIndex]) {
      this.dots[this.currentIndex].classList.add('active');
    }
  }

  private updateSliderPosition() {
    // Her kart 320px + 32px gap, ortadaki kartı merkeze almak için:
    // translateX = -(currentIndex * (cardWidth + cardGap) - (containerWidth/2 - cardWidth/2))
    const visibleCards = 3;
    const container = this.slider.parentElement as HTMLElement;
    const containerWidth = container.offsetWidth;
    const totalCardWidth = this.cardWidth + this.cardGap;
    // Ortadaki kartı merkeze almak için kaydırma miktarı:
    const offset =
      this.currentIndex * totalCardWidth -
      (containerWidth / 2 - this.cardWidth / 2);
    this.slider.style.transform = `translateX(${-offset}px)`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.testimonial-slider')) {
    new TestimonialSlider();
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', function (this: EventTarget) {
      const questionEl = this as HTMLElement;
      const faqItem = questionEl.closest('.faq-item');
      const answer = faqItem?.querySelector('.faq-answer');
      const isOpen = answer?.classList.contains('show');
      // Tüm cevapları kapat
      document
        .querySelectorAll('.faq-answer')
        .forEach((el) => el.classList.remove('show'));
      document
        .querySelectorAll('.faq-question')
        .forEach((el) => el.classList.remove('active'));
      // Sadece tıklananı aç
      if (!isOpen) {
        answer?.classList.add('show');
        questionEl.classList.add('active');
      }
    });
  });
});
