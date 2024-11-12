import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiAiService } from '../services/gemini-ai.service';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardContent,
  IonCardHeader, IonCardTitle, IonItem, IonLabel,
  IonButton, IonIcon, IonProgressBar, IonText,
  IonRadioGroup, IonRadio, IonImg, IonTextarea,
  IonRippleEffect
} from '@ionic/angular/standalone';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    // TODO: Add all the Ionic components from the imports above
    // HINT: Copy each component name from the imports list
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonProgressBar,
    IonText,
    IonRadioGroup,
    IonRadio,
    IonImg,
    IonTextarea,
    IonRippleEffect
    
  ]
})
export class HomePage {
  // TODO: Add default prompt
  // HINT: Something like "Provide a recipe for these baked goods"
  prompt = 'Provide a recipe for these baked goods';
  output = '';
  isLoading = false;

  availableImages = [
    { url: 'assets/images/baked_goods_1.jpg', label: 'Baked Good 1' },
    { url: 'assets/images/baked_goods_2.jpg', label: 'Baked Good 2' },
    { url: 'assets/images/baked_goods_3.jpg', label: 'Baked Good 3' }
  ];

  selectedImage = this.availableImages[0].url;

  constructor(private geminiAiService: GeminiAiService) {
    this.onSubmit = this.onSubmit.bind(this);
  }

  get formattedOutput() {
    return this.output.replace(/\n/g, '<br>');
  }

  selectImage(url: string) {
    // TODO: Set the selectedImage property
    // HINT: this.selectedImage = url;
    this.selectedImage = url;
  }

  async onSubmit() {
    this.isLoading = true;
    try {
      // Get base64 image
      const imageBase64 = await this.geminiAiService.getImageAsBase64(this.selectedImage);
      
      // Generate recipe using the service
      this.output = await this.geminiAiService.generateRecipe(imageBase64, this.prompt);
    } catch (error) {
      console.error('Error:', error);
      this.output = 'Error generating recipe. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
