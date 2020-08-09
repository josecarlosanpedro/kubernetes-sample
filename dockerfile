 
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: walkdocs-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: letsencrypt
spec:
  tls:
  - hosts:
    - wd-aks-ingress.eastus.cloudapp.azure.com
    secretName: tls-secret
  rules:
  - host: wd-aks-ingress.eastus.cloudapp.azure.com
    http:
      paths:
      - backend:
          serviceName: reactjs-sample-pod
          servicePort: 80
        path: /
      - backend:
          serviceName: node-server-sample
          servicePort: 80
        path: /server
© 2020 GitHub, Inc.