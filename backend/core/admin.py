from django import forms
from django.contrib import admin
from .models import Profile, Project, SkillCategory, Skill, Experience, ContactMessage

# Custom Admin Branding
admin.site.site_header = "Kiran Adep • Portfolio Admin"
admin.site.site_title = "Kiran Adep Portfolio Portal"
admin.site.index_title = "Manage Portfolio Content"


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email', 'updated_at')
    fieldsets = (
        ("Personal Information", {
            "fields": ("name", "title", "email", "bio", "avatar", "avatar_url")
        }),
        ("Social & Resume", {
            "fields": ("github_url", "linkedin_url", "resume_url")
        }),
    )

    def has_add_permission(self, request):
        return not Profile.objects.exists()


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'project_type', 'date', 'display_order', 'is_visible')
    list_editable = ('display_order', 'is_visible')
    list_filter = ('project_type', 'is_visible')
    search_fields = ('title', 'description', 'project_type')
    ordering = ('display_order', '-created_at')
    fields = ('title', 'project_type', 'date', 'description', 'image', 'image_url', 'technologies', 'live_link', 'github_link', 'display_order', 'is_visible')


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'display_order')
    list_editable = ('display_order',)
    search_fields = ('name', 'slug')
    ordering = ('display_order', 'name')
    prepopulated_fields = {'slug': ('name',)}


class SkillAdminForm(forms.ModelForm):
    category = forms.ChoiceField(choices=[], required=True, help_text="Select a category or add a new one in Skill Categories")

    class Meta:
        model = Skill
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        cats = list(SkillCategory.objects.all().values_list('slug', 'name'))
        if not cats:
            cats = [
                ('language', 'Languages'),
                ('framework', 'Frameworks'),
                ('backend', 'Backend'),
                ('data', 'Data Access'),
                ('database', 'Databases'),
                ('security', 'Security'),
                ('frontend', 'Frontend'),
                ('tools', 'Tools'),
                ('ai', 'AI / ML'),
                ('ai-tools', 'AI Tools'),
                ('other', 'Other'),
            ]
        # Keep current instance category if custom
        if self.instance and self.instance.category:
            cur = self.instance.category
            if cur not in [c[0] for c in cats]:
                cats.append((cur, cur.title()))
        self.fields['category'].choices = cats


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    form = SkillAdminForm
    list_display = ('name', 'category', 'level', 'is_emoji', 'emoji', 'display_order', 'is_visible')
    list_editable = ('level', 'display_order', 'is_visible')
    list_filter = ('category', 'is_visible')
    search_fields = ('name', 'category')
    ordering = ('display_order', 'category', 'name')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('year', 'title', 'company', 'experience_type', 'highlight', 'display_order')
    list_editable = ('highlight', 'display_order')
    list_filter = ('experience_type', 'highlight')
    search_fields = ('title', 'company', 'description')
    ordering = ('display_order',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at', 'is_read')
    list_editable = ('is_read',)
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('name', 'email', 'message', 'created_at')
    ordering = ('-created_at',)
