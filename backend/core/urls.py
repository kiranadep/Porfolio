from django.urls import path
from .views import (
    PortfolioAggregateView,
    ProjectListView,
    SkillListView,
    ExperienceListView,
    ContactMessageCreateView,
    HealthCheckView,
)

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('portfolio/', PortfolioAggregateView.as_view(), name='portfolio-aggregate'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('skills/', SkillListView.as_view(), name='skill-list'),
    path('experiences/', ExperienceListView.as_view(), name='experience-list'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact-create'),
]

