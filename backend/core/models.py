from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    matric_number = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return f"{self.username} ({self.matric_number})"
    
class Election(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    active_status = models.BooleanField(default=True)  # True = voting ongoing
    show_results = models.BooleanField(default=False)  # Control result visibility

    def __str__(self):
        return self.title


    
class Candidate(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    election = models.ForeignKey(Election, on_delete=models.CASCADE, related_name="candidates")

    def __str__(self):
        return f"{self.user.username} for {self.election.title}"

class Vote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "candidate")  # Prevents duplicate same vote

    def __str__(self):
        return f"{self.user.username} voted for {self.candidate}"

    