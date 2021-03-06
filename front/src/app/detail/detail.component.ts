﻿/*eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { EvaluationService } from '@/_services';
import { Evaluation } from '@/_models';

@Component({templateUrl: 'detail.component.html'})
export class DetailComponent implements OnInit {
    detailForm: FormGroup;
    student;
    loading = false;
    submitted = false;
    phones: string[] = [];
    evaluations: Evaluation[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private evaluationService: EvaluationService,
        private router: Router,
        private route: ActivatedRoute,
        private datePipe: DatePipe
        ) {}

    ngOnInit() {

        var yyyyMMdd = this.datePipe.transform(new Date(),"yyyy-MM-dd");

        this.route
        .queryParams
        .subscribe(params => {
            // Defaults to 0 if no query param provided.
            this.student = JSON.parse(params.student);
        });

        this.detailForm = this.formBuilder.group({
            name:           [this.student ? this.student.name           : '' , Validators.required],
            registration:   [this.student ? this.student.registration   : '' , Validators.required],
            email:          [this.student ? this.student.email          : '' , Validators.required],
            cpf:            [this.student ? this.student.cpf            : '' , Validators.required],
            rg:             [this.student ? this.student.rg             : '' , Validators.required],
            birthdate:      [this.student ? this.student.birthdate      : '' , Validators.required],
        });

        this.phones = this.student.phones;

        this.loadEvaluations(this.student.evaluations);

    }

    // convenience getter for easy access to form fields
    get f() { return this.detailForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.detailForm.invalid) {
            return;
        }

        this.loading = true;

        this.router.navigate(['/register'], { queryParams: { student: JSON.stringify(this.student) } });
        
    }

    loadEvaluations(studentEvaluationsIds) {
        this.evaluationService.getAll().subscribe(evaluations => {
            let response: Evaluation[] = []; 
            evaluations.forEach(function (evaluation) {
                if(studentEvaluationsIds.indexOf(evaluation._id) > -1) {
                    response.push(evaluation);  
                }
            });
            
            this.evaluations = response;
            console.log(evaluations);
        });
    }

}
