from django import forms

class StudentForm(forms.Form):
    studentName = forms.CharField(max_length=100)
    rollNumber = forms.IntegerField()
    standard = forms.CharField(max_length=20)
    outOff = forms.IntegerField()