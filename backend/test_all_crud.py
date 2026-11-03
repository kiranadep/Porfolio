import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from django.test import Client
from core.models import Profile, Project, Skill, Experience, ContactMessage

def run_crud_tests():
    print("=" * 60)
    print("STARTING FULL CRUD & API VERIFICATION FOR NEON DATABASE")
    print("=" * 60)

    client = Client()

    # ----------------------------------------------------
    # 1. PROFILE (READ & UPDATE)
    # ----------------------------------------------------
    print("\n[1] Testing Profile CRUD...")
    profile = Profile.objects.first()
    assert profile is not None, "Profile should exist"
    original_title = profile.title
    
    # Update
    profile.title = "Software Engineer (Updated Test)"
    profile.save()
    profile.refresh_from_db()
    assert profile.title == "Software Engineer (Updated Test)", "Profile update failed"
    
    # Verify API
    res = client.get('/api/portfolio/')
    assert res.status_code == 200, f"API failed with {res.status_code}"
    assert res.json()['profile']['title'] == "Software Engineer (Updated Test)"
    
    # Revert
    profile.title = original_title
    profile.save()
    print(" -> Profile READ, UPDATE, and API REFLECTION: SUCCESS")

    # ----------------------------------------------------
    # 2. PROJECT (CREATE, READ, UPDATE, DELETE)
    # ----------------------------------------------------
    print("\n[2] Testing Project CRUD...")
    # Create
    test_proj = Project.objects.create(
        title="Automated Test Project",
        description="Testing project CRUD operations",
        project_type="FullStack (.NET + React)",
        date="Nov 2026",
        technologies=["Django", "React", "Neon Postgres"],
        display_order=99,
        is_visible=True
    )
    print(f" -> Created Project id={test_proj.id}")
    
    # Read via API
    res = client.get('/api/projects/')
    assert res.status_code == 200
    titles = [p['title'] for p in res.json()]
    assert "Automated Test Project" in titles, "Project not found in API list"
    
    # Also verify in aggregate API
    res_agg = client.get('/api/portfolio/')
    agg_titles = [p['title'] for p in res_agg.json()['projects']]
    assert "Automated Test Project" in agg_titles, "Project not found in aggregate API"
    
    # Update
    test_proj.title = "Automated Test Project (Renamed)"
    test_proj.technologies = ["Django", "PostgreSQL", "FastAPI"]
    test_proj.save()
    test_proj.refresh_from_db()
    assert test_proj.title == "Automated Test Project (Renamed)"
    
    # Verify update in API
    res = client.get('/api/projects/')
    titles = [p['title'] for p in res.json()]
    assert "Automated Test Project (Renamed)" in titles, "Updated project title not reflected in API"
    
    # Delete
    test_proj.delete()
    assert not Project.objects.filter(id=test_proj.id).exists(), "Project was not deleted"
    print(" -> Project CREATE, READ, UPDATE, and DELETE: SUCCESS")

    # ----------------------------------------------------
    # 3. SKILL (CREATE, READ, UPDATE, DELETE)
    # ----------------------------------------------------
    print("\n[3] Testing Skill CRUD...")
    # Create
    test_skill = Skill.objects.create(
        name="TestFramework",
        category="framework",
        level=9,
        icon_key="SiReact",
        display_order=99,
        is_visible=True
    )
    print(f" -> Created Skill id={test_skill.id}")

    # Read via API
    res = client.get('/api/skills/')
    assert res.status_code == 200
    skill_names = [s['name'] for s in res.json()]
    assert "TestFramework" in skill_names, "Skill not in API list"

    # Update
    test_skill.level = 10
    test_skill.category = "tools"
    test_skill.save()
    test_skill.refresh_from_db()
    assert test_skill.level == 10 and test_skill.category == "tools"

    # Delete
    test_skill.delete()
    assert not Skill.objects.filter(id=test_skill.id).exists(), "Skill was not deleted"
    print(" -> Skill CREATE, READ, UPDATE, and DELETE: SUCCESS")

    # ----------------------------------------------------
    # 4. EXPERIENCE (CREATE, READ, UPDATE, DELETE)
    # ----------------------------------------------------
    print("\n[4] Testing Experience CRUD...")
    # Create
    test_exp = Experience.objects.create(
        year="2026",
        title="Senior Cloud Architect (Test)",
        company="Global Tech",
        description="Architecting microservices",
        experience_type="work",
        highlight=True,
        display_order=99
    )
    print(f" -> Created Experience id={test_exp.id}")

    # Read via API
    res = client.get('/api/experiences/')
    assert res.status_code == 200
    exp_titles = [e['title'] for e in res.json()]
    assert "Senior Cloud Architect (Test)" in exp_titles

    # Update
    test_exp.title = "Principal Engineer (Test)"
    test_exp.save()
    test_exp.refresh_from_db()
    assert test_exp.title == "Principal Engineer (Test)"

    # Delete
    test_exp.delete()
    assert not Experience.objects.filter(id=test_exp.id).exists(), "Experience was not deleted"
    print(" -> Experience CREATE, READ, UPDATE, and DELETE: SUCCESS")

    # ----------------------------------------------------
    # 5. CONTACT MESSAGE (CREATE VIA POST, READ, DELETE)
    # ----------------------------------------------------
    print("\n[5] Testing Contact Message Submission & Management...")
    contact_payload = {
        "name": "Alex Recruiter",
        "email": "alex@hiringcorp.com",
        "message": "Hello Kiran, we have an exciting backend opportunity!"
    }
    res = client.post('/api/contact/', data=contact_payload, content_type='application/json')
    assert res.status_code == 201, f"Contact POST failed with {res.status_code}"
    
    msg = ContactMessage.objects.filter(email="alex@hiringcorp.com").first()
    assert msg is not None, "Message was not stored in database"
    assert msg.is_read is False

    # Mark as read (Admin operation)
    msg.is_read = True
    msg.save()
    msg.refresh_from_db()
    assert msg.is_read is True

    # Delete (Admin operation)
    msg.delete()
    assert not ContactMessage.objects.filter(email="alex@hiringcorp.com").exists()
    print(" -> Contact Message POST, DB STORAGE, UPDATE (is_read), and DELETE: SUCCESS")

    print("\n" + "=" * 60)
    print("ALL CRUD AND API OPERATIONS PASSED WITH ZERO ERRORS!")
    print("=" * 60)

if __name__ == '__main__':
    run_crud_tests()

