import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/core/models/demande.model';
import { Echantillon } from 'src/app/core/models/echantillon.model';
import { Parameter } from 'src/app/core/models/parameter.model';
import { DemandeService } from '../demande.service';
import { EchantillonService } from '../echantillon.service';
import { Dispose } from 'src/app/core/models/Dispose.enum';
import { Return } from 'src/app/core/models/Return.enum';
import { TypeEchantillon } from 'src/app/core/models/typeEchantillon.enum';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
declare var $: any;
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
  Dispose = Dispose;
  Return = Return;
  TypeEchantillon= TypeEchantillon;
  demandeId:number;
  firstName:string = localStorage.getItem('fisrtName');
  lastName:string = localStorage.getItem('lastName');
  groupedParameters = [];
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
    this.groupParameters();
  }
  groupParameters(): void {
    for (let i = 0; i < this.parameters.length; i += 3) {
        this.groupedParameters.push(this.parameters.slice(i, i + 3));
    }
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
  getEnumDescription(enumObj: any, key: string): string {
    return enumObj[key];
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
          const demandeId = response.demandeId;
          this.demandeId=demandeId;  // Extract the demandeId from the response
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
        localStorage.setItem('demandeFormData','');
        localStorage.setItem('echantillonFormData','');
        localStorage.setItem('ListParamater','');
        this.saveAsPdf();
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
  // Hide elements that should not be in the PDF
  const modalElements = document.querySelectorAll('.modal') as NodeListOf<HTMLElement>;
  modalElements.forEach(el => el.style.display = 'none');

  const data = document.getElementById('table-to-pdf') as HTMLElement;
  const buttons = document.querySelectorAll('.form-actions button') as NodeListOf<HTMLElement>;
  buttons.forEach(button => button.style.visibility = 'hidden');

  const currentDate = new Date().toLocaleDateString('fr-FR');

  html2canvas(data, {
    scale: 2,
    windowWidth: data.offsetWidth,
    windowHeight: data.offsetHeight
  }).then(canvas => {
    const contentDataURL = canvas.toDataURL('image/png');
    let pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const scale = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);

    QRCode.toDataURL(`Nom:${this.firstName}, Prenom ${this.lastName}, demandeId:${this.demandeId}`, { errorCorrectionLevel: 'H' }, (err, url) => {
      if (err) throw err;

      const qrCodeSize = 40; // Size of QR code in mm
      const qrCodeX = 10; // QR code X position in mm
      const qrCodeY = 10; // QR code Y position in mm
      pdf.addImage(url, 'PNG', qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

      const image = new Image();
      image.src = 'assets/images/logo.png';
      image.onload = () => {
        const imageWidth = image.width * 0.1; // Scaling down the logo
        const imageHeight = image.height * 0.1; // Scaling down the logo
        const imgX = (pdfWidth - imageWidth) / 2; // Center the logo horizontally
        const imgY = 20; // Position the logo 20 mm from the top
        pdf.addImage(image, 'JPEG', imgX, imgY, imageWidth, imageHeight);

        pdf.setFontSize(10);
        const dateWidth = pdf.getStringUnitWidth(currentDate) * pdf.getFontSize() / pdf.internal.scaleFactor;
        const datePositionX = pdfWidth - dateWidth - 10; // Right-align the date
        const datePositionY = imgY + (imageHeight / 2); // Align the date vertically with the middle of the logo
        pdf.text(currentDate, datePositionX, datePositionY);

        // Calculate the starting Y position for the content, 5.3 mm below the QR code
        const contentImageY = qrCodeY + qrCodeSize + 5.3; // Position below the QR code
        const imgWidth = canvas.width * scale;
        const imgHeight = canvas.height * scale;
        const x = (pdfWidth - imgWidth) / 2; // Center the canvas image horizontally

        pdf.addImage(contentDataURL, 'PNG', x, contentImageY, imgWidth, imgHeight);
        pdf.save('DemandesSummary.pdf'); // Saving the PDF with a filename

        // Restore the elements after generating the PDF
        modalElements.forEach(el => el.style.display = 'block');
        buttons.forEach(button => button.style.visibility = 'visible');
      };
    });
  });

  // Navigate to the list of demands after generating the PDF
  this.router.navigate(['/account/Listdemande']);
}

  
  
}
  