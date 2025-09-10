from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Election, Candidate, Vote

User = get_user_model()

# ------------------------
# USER SERIALIZER
# ------------------------
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "matric_number", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)  # 🔑 hash password
        user.save()
        return user


# ------------------------
# ELECTION SERIALIZER
# ------------------------
class ElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = ["id", "title", "description", "active_status"]


# ------------------------
# CANDIDATE SERIALIZER
# ------------------------
class CandidateSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # nested user info
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source="user", write_only=True
    )

    class Meta:
        model = Candidate
        fields = ["id", "user", "user_id", "election"]


# ------------------------
# VOTE SERIALIZER
# ------------------------
class VoteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Vote
        fields = ["id", "user", "candidate", "timestamp"]

    def validate(self, data):
        user = self.context["request"].user
        candidate = data["candidate"]

        # check if user already voted in this election
        election = candidate.election
        if Vote.objects.filter(user=user, candidate__election=election).exists():
            raise serializers.ValidationError("You have already voted in this election.")
        return data

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)
