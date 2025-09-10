from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from django.contrib.auth import get_user_model

from .models import Election, Candidate, Vote
from .serializers import (
    UserSerializer,
    ElectionSerializer,
    CandidateSerializer,
    VoteSerializer,
)

User = get_user_model()


# ------------------------
# REGISTER VIEW
# ------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


# ------------------------
# ELECTION LIST
# ------------------------
class ElectionListView(generics.ListAPIView):
    queryset = Election.objects.all()
    serializer_class = ElectionSerializer


# ------------------------
# CANDIDATES FOR AN ELECTION
# ------------------------
class CandidateListView(generics.ListAPIView):
    serializer_class = CandidateSerializer

    def get_queryset(self):
        election_id = self.kwargs["election_id"]
        return Candidate.objects.filter(election_id=election_id)


# ------------------------
# VOTE VIEW
# ------------------------
class VoteCreateView(generics.CreateAPIView):
    serializer_class = VoteSerializer

    def get_queryset(self):
        return Vote.objects.all()


# ------------------------
# RESULTS VIEW
# ------------------------
class ResultsView(APIView):
    def get(self, request, election_id):
        results = (
            Candidate.objects.filter(election_id=election_id)
            .annotate(votes=Count("vote"))
            .values("id", "user__username", "votes")
        )
        return Response(results)
