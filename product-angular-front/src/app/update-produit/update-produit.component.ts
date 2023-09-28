import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../model/categorie.model';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html'

})
export class UpdateProduitComponent implements OnInit {
  currentProduit=new Produit();
  categories! : Categorie[];
  updatedCatId! : number;


   constructor(private produitService:ProduitService,private activatRout:ActivatedRoute,
    private rout:Router){}

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(
      (c)=>this.categories=c._embedded.categories ); 

    this.produitService.consulterProduit(this.activatRout.snapshot.params['id']).subscribe(prod =>
        {
           console.log(prod);
           this.currentProduit=prod;
           this.updatedCatId=this.currentProduit.categorie.idCat;
        }

    );
   
    
  }

  updateProduit(){
    this.currentProduit.categorie=this.categories.find(cat => cat.idCat == this.updatedCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
      this.rout.navigate(['produits']); }
      );
  }


}
