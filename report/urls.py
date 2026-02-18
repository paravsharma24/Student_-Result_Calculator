from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
]

class Student:
    def __init__(self, studentName, rollNumber, standard, subjects, outOff):
        self.studentName = studentName
        self.rollNumber = rollNumber
        self.standard = standard
        self.subjects = subjects
        self.outOff = outOff

    def total_marks(self):
        return self.outOff * len(self.subjects)

    def obtained_marks(self):
        return sum(self.subjects.values())

    def average(self):
        if len(self.subjects) == 0:
            return 0
        return self.obtained_marks() / len(self.subjects)

    def percentage(self):
        if self.total_marks() == 0:
            return 0
        return (self.obtained_marks() / self.total_marks()) * 100

    def pass_or_fail(self):
        passMarks = 0.40 * self.total_marks()
        return "Pass" if self.obtained_marks() >= passMarks else "Fail"
