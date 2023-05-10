import { Component } from '@angular/core';
import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { ProductosService } from 'src/app/services/productos.service';



@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent {
  productos: any[] = [];
  constructor(  private _productoService: ProductosService, private toastr: ToastrService, private storage: Storage){

  }
  ngOnInit(): void{
    this.getProductos()
  }

  getProductos (){
    this._productoService.getProductos().subscribe(data =>{
      this.productos = [];
      data.forEach((element:any) => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarProducto (id: string){
    this._productoService.eliminarProducto(id).then(()=>{
      this.toastr.error('El producto fue eliminado con exito', 'Producto eliminado');
    }).catch(error=>{
      console.log(error);
    })
  }

}
