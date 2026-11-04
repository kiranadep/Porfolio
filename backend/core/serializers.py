from rest_framework import serializers
from .models import Profile, Project, SkillCategory, Skill, Experience, ContactMessage


class ProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    resume_file_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'

    def get_avatar_url(self, obj):
        if obj.avatar:
            try:
                return obj.avatar.url
            except Exception:
                pass
        return obj.avatar_url or '/images/photo2.png'

    def get_resume_file_url(self, obj):
        if obj.resume:
            try:
                return obj.resume.url
            except Exception:
                pass
        return obj.resume_url or None


class ProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    technologies = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            try:
                return obj.image.url
            except Exception:
                pass
        return obj.image_url or '/images/project/Shopease.png'

    def get_technologies(self, obj):
        if isinstance(obj.technologies, list):
            return obj.technologies
        if isinstance(obj.technologies, str):
            import json
            try:
                parsed = json.loads(obj.technologies)
                if isinstance(parsed, list):
                    return parsed
            except Exception:
                pass
            return [t.strip() for t in obj.technologies.split(',') if t.strip()]
        return []


class SkillCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'slug', 'display_order']


class SkillSerializer(serializers.ModelSerializer):
    icon_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = '__all__'

    def get_icon_image_url(self, obj):
        if obj.icon_image:
            try:
                return obj.icon_image.url
            except Exception:
                return None
        if obj.icon_url:
            return obj.icon_url
        return None


class ExperienceSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source='get_experience_type_display', read_only=True)

    class Meta:
        model = Experience
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
