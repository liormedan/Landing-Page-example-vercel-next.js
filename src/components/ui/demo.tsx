import React from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input, Textarea, Select } from './index';

// Demo component to showcase all UI components
const UIComponentsDemo: React.FC = () => {
  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">UI Components Demo</h1>
      
      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <Button variant="default" size="sm">Primary Small</Button>
            <Button variant="default" size="default">Primary Medium</Button>
            <Button variant="default" size="lg">Primary Large</Button>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button disabled>Disabled</Button>
          </div>
          <Button className="w-full">Full Width Button</Button>
        </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <p>Small padding card</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <p>Medium padding with hover effect</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Card with Title</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Large padding card with title</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex gap-4 flex-wrap items-center">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="destructive">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="lg">Large</Badge>
        </div>
        </CardContent>
      </Card>

      {/* Form Components */}
      <Card>
        <CardHeader>
          <CardTitle>Form Components</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Username" 
              placeholder="Enter your username"
              helperText="Choose a unique username"
            />
            <Input 
              label="Email" 
              type="email"
              error="Please enter a valid email"
            />
          </div>
          
          <Textarea 
            label="Description" 
            placeholder="Enter a description"
            helperText="Describe your project in detail"
            maxLength={200}
          />
          
          <Select 
            label="Choose Package" 
            placeholder="Select a package"
            options={selectOptions}
            helperText="Select your preferred package"
          />
        </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UIComponentsDemo;