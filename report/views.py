from django.shortcuts import render
from .forms import StudentForm
from .utils import Student


def home(request):
    report_data = None

    if request.method == "POST":
        form = StudentForm(request.POST)

        if form.is_valid():
            studentName = form.cleaned_data["studentName"]
            rollNumber = form.cleaned_data["rollNumber"]
            standard = form.cleaned_data["standard"]
            outOff = form.cleaned_data["outOff"]
            subjects_input = request.POST.get("subjects")


            subjects = {}
            subject_list = subjects_input.split(",")

            for item in subject_list:
                name, mark = item.split("-")
                subjects[name.strip()] = int(mark.strip())

            student = Student(studentName, rollNumber, standard, subjects, outOff)

            report_data = {
                "student": student,
                "subjects": subjects,
                "obtained": student.obtained_marks(),
                "total": student.total_marks(),
                "average": student.average(),
                "percentage": student.percentage(),
                "result": student.pass_or_fail(),
            }
    else:
        form = StudentForm()

    return render(request, "report/report.html", {
        "form": form,
        "data": report_data
    })
