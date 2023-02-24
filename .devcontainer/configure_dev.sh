#!/bin/bash

# Check that all required arguments are provided
if [[ $# -ne 3 ]]; then
    echo "Usage: $0 <subscription_id> <resource_group> <name>"
    exit 1
fi

# Save arguments as variables
subscription_id=$1
resource_group=$2
name=$3

echo "Installing Kubernetes..."
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
mv kubectl /usr/bin/
echo ""


echo "Installing Helm..."
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm dependency build ../helm/
echo ""


echo "Install Azure CLI"
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
echo ""


# Configure AKS
echo "Configuring AKS $subscription_id..."
az login
az account set --subscription $subscription_id
az aks get-credentials --resource-group $resource_group --name $name
echo ""

echo "Done!"
