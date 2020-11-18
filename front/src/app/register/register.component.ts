﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, StudentService, AuthenticationService } from '@/_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        //private authenticationService: AuthenticationService,
        //private userService: UserService,
        private studentService: StudentService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) { 
        //    this.router.navigate(['/']);
        //}
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name:           ['', Validators.required],
            matriculation:  ['', Validators.required],
            email:          ['', Validators.required],
            cpf:            ['', Validators.required],
            rg:             ['', Validators.required],
            phone1:         ['', Validators.required],
            phone2:         ['', Validators.required]
            //password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.studentService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Aluno registrado com sucesso!', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}