FROM centos/python-36-centos7
WORKDIR /home/app
ADD requirements.txt /home/app
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

