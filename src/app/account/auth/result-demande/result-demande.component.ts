import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/core/models/demande.model';
import { Echantillon } from 'src/app/core/models/echantillon.model';
import { Parameter } from 'src/app/core/models/parameter.model';
import { DemandeService } from '../demande.service';
import { EchantillonService } from '../echantillon.service';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-result-demande',
  templateUrl: './result-demande.component.html',
  styleUrls: ['./result-demande.component.scss']
})
export class ResultDemandeComponent implements OnInit {
  parameters: Parameter[] = [];  // Initialize as empty array
  demandes: Demande;      // If demandes is also an array, initialize it as well
  echantillons: Echantillon[] = [];  // Initialize as empty array
  echantillonId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private demandeService: DemandeService,
    private echantillonService: EchantillonService,
    private toastr: ToastrService 
  ) { }
  ngOnInit(): void {
    this.loadFormDataFromLocalStorage();
  }

  private loadFormDataFromLocalStorage() {
    const demandeData = localStorage.getItem('demandeFormData');
    const echantillonData = localStorage.getItem('echantillonFormData');
    const parameterData = localStorage.getItem('ListParamater');

    this.demandes = demandeData ? JSON.parse(demandeData) : [];
    this.echantillons = echantillonData ? JSON.parse(echantillonData) : [];
    this.parameters = parameterData ? JSON.parse(parameterData) : [];
    this.linkParametersToEchantillons();
  }
  private linkParametersToEchantillons() {
    this.echantillons.forEach(ech => {
      // Filter parameters by echantillonId and map to get their IDs
      ech.parameterIds = this.parameters
        .filter(param => param.echantillonId == ech.echantillonId)
        .map(param => param.parameterId);
    });
    console.log(this.echantillons);
  }
  getParametersByEchantillonId(echantillonId: number): Parameter[] {
    const param= this.parameters.filter(param => param.echantillonId == echantillonId);
    return param;
  }

  saveDemande(): void {
    const userId = localStorage.getItem('userId'); 
    this.demandes.userId = userId;
      this.demandeService.createDemande(this.demandes).subscribe({
        next: (response) => {
          console.log('Demande created successfully', response);
          const demandeId = response.demandeId;  // Extract the demandeId from the response
          console.log('Received Demande ID:', demandeId);
          this.saveEchantillon(demandeId);
        },
        error: (error) => console.error('Error creating demande', error)
      });
  }
  saveEchantillon(demandeId: number){
    this.echantillonService.createEchantillon(demandeId, this.echantillons).subscribe({
      next: (response) => {
        console.log('Batch of Echantillons sent successfully', response),
        this.toastr.success('demande envoyée avec succès', '', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          closeButton: true,
          progressBar: true
        });  
        this.router.navigate(['/account/Listdemande']);
      },
      error: (error) => {
        console.error('Error sending batch of Echantillons', error)
        this.toastr.error(error, 'Error sending batch of Echantillons', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
      }
    });

   
  }
  saveAsPdf() {
    const data = document.getElementById('table-to-pdf') as HTMLElement;
    const buttons = document.querySelectorAll('.form-actions button');
    buttons.forEach(button => (button as HTMLElement).style.visibility = 'hidden');
  
    const currentDate = new Date().toLocaleDateString('fr-FR'); // Format the date as you prefer, using French locale here
  
    html2canvas(data, {
      scale: 2, // Adjust this for better resolution
      windowWidth: data.offsetWidth,
      windowHeight: data.offsetHeight
    }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
  
      const scaleToFitWidth = pdfWidth / canvasWidth;
      const scaleToFitHeight = pdfHeight / canvasHeight;
      const scale = Math.min(scaleToFitWidth, scaleToFitHeight);
  
      // Load the image from the assets
      const image = new Image();
      image.src = 'assets/images/logo.png'; // Make sure the path is correct
      image.onload = () => {
        // Calculate dimensions to maintain aspect ratio at 20% size
        const imageHeight = image.height / 5; // Reduce to 20% of original height
        const imageWidth = image.width / 5; // Reduce to 20% of original width
  
        // Calculate position to align on the left and higher up
        const imgX = 10; // Position 10mm from the left edge
        const imgY = 10; // Position 10mm from the top, moved higher from previous 20mm
  
        // Add image to PDF
        pdf.addImage(image, 'JPEG', imgX, imgY, imageWidth, imageHeight);
  
        // Calculate the right alignment for the date
        pdf.setFontSize(10);
        const dateWidth = pdf.getStringUnitWidth(currentDate) * pdf.getFontSize() / pdf.internal.scaleFactor;
        const datePositionX = pdfWidth - dateWidth - 10; // 10 mm margin from the right edge
  
        pdf.text(currentDate, datePositionX, 10); // Position the date on the right
  
        // Add the canvas image
        const contentImageY = imgY + imageHeight + 5; // Position below the image with reduced spacing
        pdf.addImage(contentDataURL, 'PNG', (pdfWidth - canvasWidth * scale) / 2, contentImageY, canvasWidth * scale, canvasHeight * scale);
        pdf.save('DemandesSummary.pdf'); // Saving the PDF with a filename
  
        // Show buttons again after generating the PDF
        buttons.forEach(button => (button as HTMLElement).style.visibility = 'visible');
      };
    });
  }
  
  
}
  