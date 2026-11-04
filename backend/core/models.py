from django.db import models
import json


class Profile(models.Model):
    name = models.CharField(max_length=150, default="Kiran Ramesh Adep")
    title = models.CharField(max_length=200, default="Software Engineer | Java · Python · .NET")
    email = models.EmailField(default="kiran221202adep@gmail.com")
    github_url = models.URLField(default="https://github.com/kiranadep")
    linkedin_url = models.URLField(default="https://www.linkedin.com/in/kiranadep/")
    bio = models.TextField(
        default=(
            "Software Engineer with 2+ years of experience building scalable backend systems, "
            "RESTful APIs, and full-stack applications using Java, Python, and C#/.NET. "
            "Proficient in Spring Boot, ASP.NET Core, microservices, and relational databases. "
            "I also work with AI/ML tools and agentic development assistants to ship clean, reliable solutions faster."
        )
    )
    resume_url = models.CharField(max_length=500, blank=True, default="", help_text="Or paste a direct URL to your resume PDF")
    resume = models.FileField(upload_to='resumes/', blank=True, null=True, help_text="Upload your resume PDF (preferred)")
    avatar = models.FileField(upload_to='profile/', blank=True, null=True, help_text="Upload custom avatar photo")
    avatar_url = models.CharField(max_length=500, blank=True, default="/images/photo2.png", help_text="Or direct URL to avatar")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile Information"
        verbose_name_plural = "Profile Information"

    def __str__(self):
        return f"{self.name} - {self.title}"


class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.FileField(upload_to='projects/', blank=True, null=True, help_text="Upload project screenshot/image (PNG, JPG, SVG, WebP)")
    image_url = models.CharField(max_length=500, blank=True, default="/images/project/Shopease.png", help_text="Or direct URL to screenshot")
    project_type = models.CharField(max_length=100, default="FullStack Project")
    date = models.CharField(max_length=50, blank=True, help_text="e.g. Oct 2025 or 12/2024")
    live_link = models.URLField(blank=True, default="")
    github_link = models.URLField(blank=True, default="")
    technologies = models.JSONField(
        default=list,
        blank=True,
        help_text="Enter JSON list (e.g. [\"React\", \"Node\"]) or comma-separated tags (e.g. React, Node, C#)"
    )
    display_order = models.PositiveIntegerField(default=0, help_text="Lower number appears first")
    is_visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', '-created_at']

    def clean(self):
        super().clean()
        if isinstance(self.technologies, str):
            try:
                parsed = json.loads(self.technologies)
                if isinstance(parsed, list):
                    self.technologies = parsed
                else:
                    self.technologies = [str(parsed)]
            except Exception:
                self.technologies = [t.strip() for t in self.technologies.split(',') if t.strip()]

    def __str__(self):
        return self.title


class SkillCategory(models.Model):
    name = models.CharField(max_length=100, unique=True, help_text="Display label, e.g. 'AI Tools'")
    slug = models.SlugField(max_length=100, unique=True, blank=True, help_text="Identifier, e.g. 'ai-tools'")
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'name']
        verbose_name = "Skill Category"
        verbose_name_plural = "Skill Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(
        max_length=100,
        default='language',
        help_text="Category slug, e.g. 'ai-tools', 'language', 'framework'"
    )
    level = models.PositiveIntegerField(default=8, help_text="Skill rating from 1 to 10")
    icon_image = models.FileField(upload_to='skills/', blank=True, null=True, help_text="Upload custom SVG, PNG, or image icon")
    icon_url = models.CharField(max_length=500, blank=True, default="", help_text="Or direct URL to SVG/image")
    icon_key = models.CharField(max_length=100, blank=True, default="", help_text="React icon key like FaJava, SiDotnet")
    is_emoji = models.BooleanField(default=False)
    emoji = models.CharField(max_length=10, blank=True, default="")
    display_order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order', 'category', 'name']

    def __str__(self):
        return f"{self.name} ({self.category} - {self.level}/10)"


class Experience(models.Model):
    TYPE_CHOICES = [
        ('work', 'Work Experience'),
        ('education', 'Education'),
        ('future', 'Open to Work / Future'),
    ]

    year = models.CharField(max_length=100, help_text="e.g. Aug 2024 – Present or 2021 – 2024")
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200, blank=True, default="")
    description = models.TextField(blank=True, default="")
    experience_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='work')
    highlight = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return f"{self.year}: {self.title} {f'@ {self.company}' if self.company else ''}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email}) at {self.created_at.strftime('%Y-%m-%d %H:%M')}"
