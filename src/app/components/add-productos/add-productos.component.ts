import { Component } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-productos',
  templateUrl: './add-productos.component.html',
  styleUrls: ['./add-productos.component.css']
})
export class AddProductosComponent {
  createProducto: FormGroup;
  submitted = false;
  id: string | null;
  texto = 'Agregar producto'
  botonAddEdit = 'Agregar'
  imagen  = ''

  constructor(private storage: Storage, private fb: FormBuilder, private ProductosService: ProductosService,
    private toastr: ToastrService, private router: Router, private aRoute: ActivatedRoute){
    this.createProducto = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      escala: ['', Validators.required],
      bpm: ['', Validators.required],

    })
    this.id = this.aRoute.snapshot.paramMap.get('id') ;
  }
  ngOnInit(): void {
    this.esEditar();
  }


  agregarEditarProducto(){
    this.submitted = true;
    if (this.createProducto.invalid){
      return ;
    }
    if(this.id === null){
      this.texto = 'Agregar producto',this.botonAddEdit = 'Agregar'
      this.agregarProducto();
    }else{
      this.editarProducto(this.id );
    }

  }

  agregarProducto(){

    const producto: any = {
      nombre: this.createProducto.value.nombre,
      precio: this.createProducto.value.precio,
      descripcion: this.createProducto.value.descripcion,
      escala: this.createProducto.value.escala,
      bpm: this.createProducto.value.bpm,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
   }
   this.ProductosService.agregarProducto(producto).then(()=>{
     this.toastr.success('Producto agregado exitosamente', 'producto agregado');
     this.router.navigate(['/listProductos'])
   }).catch(error => {
     console.log(error);
   })
  }

  editarProducto(id:string){
    this.texto = 'Editar producto';
    const producto: any = {
      nombre: this.createProducto.value.nombre,
      precio: this.createProducto.value.precio,
      descripcion: this.createProducto.value.descripcion,
      escala: this.createProducto.value.escala,
      bpm: this.createProducto.value.bpm,
      fechaActualizacion: new Date()
   }
    this.ProductosService.actualizarProducto(id,producto).then(()=>{
      this.toastr.info('El producto fue actualizado', 'Producto Actualizado')
    })
    this.router.navigate(['/listProductos']);
  }

  uploadImagen($event: any){
    const file = $event.target.files[0];
    const imgref = ref(this.storage, `iconProductos/${this.createProducto.value.nombre}`)

    uploadBytes(imgref,file)
    .then(respone => console.log(Response))
    .catch(error=>console.log(error));
  }

  uploadPista($event: any){
    const file = $event.target.files[0];
    const imgref = ref(this.storage, `pista/${this.createProducto.value.nombre}`)

    uploadBytes(imgref,file)
    .then(respone => console.log(Response))
    .catch(error=>console.log(error));
  }

  esEditar(){
    if(this.id !== null){
      this.ProductosService.getProducto(this.id).subscribe(data => {
        console.log(data.payload.data()['nombre']);
        this.createProducto.setValue({
          nombre: data.payload.data()['nombre'],
          precio: data.payload.data()['precio'],
          bpm: data.payload.data()['bpm'],
          escala: data.payload.data()['escala'],
          descripcion: data.payload.data()['descripcion'],
        })
      })
    }
  }


}
