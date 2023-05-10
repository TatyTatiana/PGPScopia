import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: AngularFirestore) { }

  agregarProducto (producto: any): Promise<any>{


    return this.firestore.collection('producto').add(producto);
  }
  getProductos (): Observable<any>{
    return this.firestore.collection('producto').snapshotChanges();
  }
  eliminarProducto (id: string): Promise<any>{
    return this.firestore.collection('producto').doc(id).delete();
  }
  getProducto(id: string): Observable<any>{
    return this.firestore.collection('producto').doc(id).snapshotChanges();
  }

  actualizarProducto (id: string, data: any): Promise<any>{
    return this.firestore.collection('producto').doc(id).update(data);
  }
}
