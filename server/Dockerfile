FROM python:3.9

ADD main.py .

RUN pip install Flask
RUN pip install torch
RUN pip install scipy
RUN pip install CORS

CMD ["python",'./main.py']
