from django.test import TestCase, Client
from django.urls import reverse
from core.models import Profile, Project, Skill, Experience, ContactMessage


class PortfolioAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        Profile.objects.create(name="Kiran Ramesh Adep", title="Software Engineer")
        Project.objects.create(title="Smart Attendance System", description="Attendance system")
        Skill.objects.create(name="Java", category="language", level=9)
        Experience.objects.create(year="2024", title="Software Engineer", company="LSL")

    def test_health_check(self):
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'healthy')

    def test_portfolio_aggregate(self):
        response = self.client.get('/api/portfolio/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsNotNone(data['profile'])
        self.assertEqual(data['profile']['name'], 'Kiran Ramesh Adep')
        self.assertEqual(len(data['projects']), 1)
        self.assertEqual(len(data['skills']), 1)
        self.assertEqual(len(data['experiences']), 1)

    def test_contact_submission(self):
        payload = {
            "name": "Recruiter Jane",
            "email": "jane@techcorp.com",
            "message": "Hi Kiran, we would like to interview you for a Backend role!"
        }
        response = self.client.post('/api/contact/', data=payload, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(ContactMessage.objects.filter(email="jane@techcorp.com").exists())
