from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile, Project, SkillCategory, Skill, Experience, ContactMessage
from .serializers import (
    ProfileSerializer,
    ProjectSerializer,
    SkillCategorySerializer,
    SkillSerializer,
    ExperienceSerializer,
    ContactMessageSerializer
)


class PortfolioAggregateView(APIView):
    """
    Returns complete portfolio data in a single request for fast frontend loading.
    """
    def get(self, request):
        profile = Profile.objects.first()
        projects = Project.objects.filter(is_visible=True)
        skills = Skill.objects.filter(is_visible=True)
        experiences = Experience.objects.all()
        categories = SkillCategory.objects.all()

        return Response({
            "profile": ProfileSerializer(profile).data if profile else None,
            "projects": ProjectSerializer(projects, many=True).data,
            "skills": SkillSerializer(skills, many=True).data,
            "experiences": ExperienceSerializer(experiences, many=True).data,
            "categories": SkillCategorySerializer(categories, many=True).data,
        })


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.filter(is_visible=True)
    serializer_class = ProjectSerializer


class SkillCategoryListView(generics.ListAPIView):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer


class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.filter(is_visible=True)
    serializer_class = SkillSerializer


class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Thank you! Your message has been received."},
            status=status.HTTP_201_CREATED
        )


class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "healthy", "service": "Kiran Portfolio API"})
