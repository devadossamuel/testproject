# basic URL Configurations
from django.urls import include, path,re_path
# import routers
from rest_framework import routers

# import everything from views
from .views import *

# define the router
router = routers.DefaultRouter()

# define the router path and viewset to be used
router.register(r'molecule', MoleculeViewSet)
router.register(r'activity', ActivityViewSet)
router.register(r'target', TargetViewSet)

# specify URL Path for rest_framework
urlpatterns = [
    path('', include(router.urls)),
    path('api/', include('rest_framework.urls')),
    re_path('^activitydetail/(?P<moleculeid>.+)/$', ActivityDetail.as_view()),
]