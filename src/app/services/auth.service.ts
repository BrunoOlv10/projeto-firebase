import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private provider = new GoogleAuthProvider();

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController
  ) {}

  signIn() {
    this.fireAuth.signInWithPopup(this.provider)
    .then((credentials) => {
      this.presentToast(`Autenticado como ${credentials.user?.email}`, 'bottom');
      this.router.navigate(['/dashboard']);
    })
    .catch((err) => {
      this.presentToast(`Ocorreu um erro ao tentar entrar com sua conta do google, tente novamente mais tarde.`, 'bottom');
      console.log(`Error code: ${err.code}, message: ${err.message}`);
    });
  }

  signOut() {
    this.fireAuth.signOut()
    .then(() => {
      this.presentToast(`Você foi desconectado.`, 'bottom');
      this.router.navigate(['/home']);
    })
    .catch((err) => {
      this.presentToast(`A tentativa de desconectar não foi bem-sucedida. Tente novamente mais tarde.`, 'bottom');
      console.log(`Error code: ${err.code}, message: ${err.message}`);
    });
  }

  isAuthenticated() {
    return this.fireAuth.user;
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: 3000,
    });

    await toast.present();
  }
}
