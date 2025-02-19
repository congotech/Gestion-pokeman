export default class AuthenticationService {
    static isAuthenticated: boolean = false;
  
    static login(username: string, password: string): Promise<boolean> {
      const isAuthenticated = (username === "pikachou" && password === "pikachu");
  
      return new Promise(resolve => {
        setTimeout(() => {
          this.isAuthenticated = isAuthenticated;
          if (isAuthenticated) {
            localStorage.setItem('token', 'pikachu');
          }
          resolve(isAuthenticated);
        }, 1000);
      });
    }
  
    static logout(): void {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
    }
  
    static checkAuth(): boolean {
      const token = localStorage.getItem('token');
      if (token === 'pikachu') {
        this.isAuthenticated = true;
        return true;
      }
      return false;
    }
  }