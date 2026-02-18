import React from 'react';
import { Code2, Terminal, Key, Zap, ArrowRight, Copy, Check } from 'lucide-react';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from '@/components/custom/CustomCard';
import { CustomButton } from '@/components/custom/CustomButton';

const ApiReference: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/skills',
      description: 'Retrieve all skills for the authenticated user',
      response: `{
  "data": [
    {
      "id": "skill_123",
      "name": "React",
      "category": "frontend",
      "proficiency": "advanced"
    }
  ]
}`,
    },
    {
      method: 'POST',
      path: '/api/skills',
      description: 'Create a new skill',
      response: `{
  "data": {
    "id": "skill_124",
    "name": "TypeScript",
    "category": "frontend",
    "proficiency": "intermediate"
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/projects',
      description: 'Retrieve all projects for the authenticated user',
      response: `{
  "data": [
    {
      "id": "proj_123",
      "name": "SkillSync App",
      "status": "in-progress",
      "skills": ["skill_123", "skill_124"]
    }
  ]
}`,
    },
    {
      method: 'POST',
      path: '/api/projects',
      description: 'Create a new project',
      response: `{
  "data": {
    "id": "proj_124",
    "name": "New Project",
    "status": "planning",
    "milestones": []
  }
}`,
    },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'POST': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'PUT': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'DELETE': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
            <Code2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold font-display text-foreground sm:text-5xl mb-4">
            API Reference
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Integrate SkillSync with your applications using our RESTful API. Build custom integrations and automate your workflow.
          </p>
        </div>

        {/* Authentication */}
        <CustomCard className="mb-12 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              Authentication
            </CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-4">
            <p className="text-muted-foreground">
              All API requests require authentication using a Bearer token. Include your API key in the Authorization header:
            </p>
            <div className="relative">
              <pre className="p-4 rounded-lg bg-secondary/50 border border-border text-sm overflow-x-auto">
                <code className="text-foreground">
                  Authorization: Bearer your_api_key_here
                </code>
              </pre>
              <button
                onClick={() => copyToClipboard('Authorization: Bearer your_api_key_here', -1)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                {copiedIndex === -1 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              You can generate API keys from your account settings page.
            </p>
          </CustomCardContent>
        </CustomCard>

        {/* Base URL */}
        <CustomCard className="mb-12 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              Base URL
            </CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent>
            <pre className="p-4 rounded-lg bg-secondary/50 border border-border text-sm">
              <code className="text-foreground">https://api.skillsync.dev/v1</code>
            </pre>
          </CustomCardContent>
        </CustomCard>

        {/* Endpoints */}
        <h2 className="text-2xl font-bold font-display text-foreground mb-6">Endpoints</h2>
        <div className="space-y-6">
          {endpoints.map((endpoint, index) => (
            <CustomCard key={index} animate animationDelay={index * 100}>
              <CustomCardHeader>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getMethodColor(endpoint.method)}`}>
                    {endpoint.method}
                  </span>
                  <code className="text-foreground font-mono">{endpoint.path}</code>
                </div>
              </CustomCardHeader>
              <CustomCardContent className="space-y-4">
                <p className="text-muted-foreground">{endpoint.description}</p>
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Response</p>
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-secondary/50 border border-border text-sm overflow-x-auto">
                      <code className="text-muted-foreground">{endpoint.response}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(endpoint.response, index)}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </CustomCardContent>
            </CustomCard>
          ))}
        </div>

        {/* Rate Limiting */}
        <CustomCard className="mt-12 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Rate Limiting
            </CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-4">
            <p className="text-muted-foreground">
              API requests are rate limited to ensure fair usage:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                Free tier: 100 requests per hour
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                Pro tier: 1,000 requests per hour
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                Enterprise: Custom limits available
              </li>
            </ul>
          </CustomCardContent>
        </CustomCard>
      </div>
    </div>
  );
};

export default ApiReference;
