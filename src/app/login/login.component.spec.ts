import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./login.component";
import { UserService } from "../services/user.service";
import { AuthService } from "../auth/auth.service";
import { of, throwError } from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: LoginComponent }
        ]),
        FormsModule
      ],
      providers: [
        UserService,
        AuthService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should log in with valid credentials and navigate to dashboard', () => {
    spyOn(userService, 'loginAsEvaluator').and.returnValue(of({ success: true }));
    spyOn(authService, 'login');
    component.username = 'testuser';
    component.password = 'testpassword';
    component.loginAsEvaluator();
    expect(userService.loginAsEvaluator).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(authService.login).toHaveBeenCalledWith('testuser', 'testpassword');
  });

  it('should handle login with invalid credentials', () => {
    const errorResponse = { status: 400, message: 'Invalid credentials' };
    spyOn(userService, 'loginAsEvaluator').and.returnValue(throwError(errorResponse));
    spyOn(console, 'error');
    component.username = 'invaliduser';
    component.password = 'invalidpassword';
    component.loginAsEvaluator();
    expect(userService.loginAsEvaluator).toHaveBeenCalledWith('invaliduser', 'invalidpassword');
    expect(console.error).toHaveBeenCalledWith('Login failed:', errorResponse);
    expect(console.error).toHaveBeenCalledWith('Invalid credentials');
  });
});