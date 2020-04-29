from django.contrib import admin

from childify_registry.api.models import User, Family, Child, Parent

admin.site.register(User)
admin.site.register(Family)
admin.site.register(Child)
admin.site.register(Parent)
