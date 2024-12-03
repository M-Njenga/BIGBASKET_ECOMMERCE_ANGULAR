import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  isSidePanelVisible: boolean= false;

  productObj: any = {

    "productId": 0,
  "productSku": "",
  "productName": "",
  "productPrice": 0,
  "productShortName": "",
  "productDescription": "",
  "createdDate": new Date(),
  "deliveryTimeSpan": "",
  "categoryId": 0,
  "productImageUrl": "",
  }
categoryList: any[]=[];
productsList: any []=[];
  constructor(private productSrv: ProductService, private snackBar: MatSnackBar){
    
  }
  ngOnInit(): void {
    this.getProducts(); 
    this.getAllCategory();
    
  }

  getAllCategory(){
    this.productSrv.getAllCategory().subscribe((res:any)=>{
this.categoryList=res;
    })
  }
  getProducts(){
    this.productSrv.getProducts().subscribe((res:any)=>{
this.productsList=res;
    })
  }
  onSave(){
    this.productSrv.saveProduct(this.productObj).subscribe((res:any)=>{

      if(res.result){
        this.snackBar.open(res.message, 'Close', { duration: 3000 });
     
       

      } else{
        this.snackBar.open(res.message, 'Close', { duration: 3000 });
      }
      
      this.getProducts();
    })
  }
  onUpdate(){
    this.productSrv.updateProduct(this.productObj).subscribe((res:any)=>{

      if(res.result){

        this.snackBar.open(res.message, 'Close', { duration: 3000 });
        
      } else{
        this.snackBar.open(res.message, 'Close', { duration: 3000 });
      }
      this.getProducts();
     
    })
  }

  onDelete(item: any){

    const isDelete = confirm('Are you sure want to delete');

    if(isDelete){
      this.productSrv.deleteProduct(item.productId).subscribe((res:any)=>{
        
        if(res.result){

          this.snackBar.open(res.message, 'Close', { duration: 3000 });
          
        } else{
          this.snackBar.open(res.message, 'Close', { duration: 3000 });
        }
      this.getProducts();
      })
    }
  }
  onEdit(item: any){
    this.productObj = item;
    this.openSidePanel();
  }
  openSidePanel(){
   this.isSidePanelVisible = true;
  }

  closeSidePanel(){
    this.isSidePanelVisible= false;
  }
}
