from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, ElectionListView, CandidateListView, VoteCreateView, ResultsView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("elections/", ElectionListView.as_view(), name="elections"),
    path("elections/<int:election_id>/candidates/", CandidateListView.as_view(), name="candidates"),
    path("vote/", VoteCreateView.as_view(), name="vote"),
    path("elections/<int:election_id>/results/", ResultsView.as_view(), name="results"),
]
