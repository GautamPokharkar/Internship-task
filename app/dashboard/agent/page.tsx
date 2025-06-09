'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bot, Settings, Save, RotateCcw } from 'lucide-react';

interface Language {
  name: string;
  value: string;
}

interface Model {
  name: string;
  value: string;
  languages: Language[];
}

interface Provider {
  name: string;
  value: string;
  models: Model[];
}

interface STTData {
  stt: Provider[];
}

interface Config {
  provider: string;
  model: string;
  language: string;
}

export default function Agent() {
  const [sttData, setSttData] = useState<STTData | null>(null);
  const [config, setConfig] = useState<Config>({
    provider: '',
    model: '',
    language: '',
  });
  const [savedConfig, setSavedConfig] = useState<Config | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load STT data from JSON file
  useEffect(() => {
    const loadSTTData = async () => {
      try {
        const response = await fetch('/stt.json');
        const data = await response.json();
        setSttData(data);
        
        // Load saved config from localStorage
        const saved = localStorage.getItem('sttConfig');
        if (saved) {
          const parsedConfig = JSON.parse(saved);
          setConfig(parsedConfig);
          setSavedConfig(parsedConfig);
        }
      } catch (error) {
        console.error('Error loading STT data:', error);
        setMessage({ type: 'error', text: 'Failed to load STT configuration data.' });
      } finally {
        setIsLoading(false);
      }
    };

    loadSTTData();
  }, []);

  const getSelectedProvider = () => {
    if (!sttData || !config.provider) return null;
    return sttData.stt.find(provider => provider.value === config.provider);
  };

  const getSelectedModel = () => {
    const provider = getSelectedProvider();
    if (!provider || !config.model) return null;
    return provider.models.find(model => model.value === config.model);
  };

  const getSelectedLanguage = () => {
    const model = getSelectedModel();
    if (!model || !config.language) return null;
    return model.languages.find(language => language.value === config.language);
  };

  const getAvailableModels = () => {
    const provider = getSelectedProvider();
    return provider ? provider.models : [];
  };

  const getAvailableLanguages = () => {
    const model = getSelectedModel();
    return model ? model.languages : [];
  };

  const handleProviderChange = (value: string) => {
    setConfig({
      provider: value,
      model: '',
      language: '',
    });
  };

  const handleModelChange = (value: string) => {
    setConfig(prev => ({
      ...prev,
      model: value,
      language: '',
    }));
  };

  const handleLanguageChange = (value: string) => {
    setConfig(prev => ({
      ...prev,
      language: value,
    }));
  };

  const handleSave = () => {
    if (!config.provider || !config.model || !config.language) {
      setMessage({ type: 'error', text: 'Please select all configuration options.' });
      return;
    }

    try {
      localStorage.setItem('sttConfig', JSON.stringify(config));
      setSavedConfig(config);
      setMessage({ type: 'success', text: 'Configuration saved successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save configuration.' });
    }
  };

  const handleReset = () => {
    setConfig({
      provider: '',
      model: '',
      language: '',
    });
    setMessage(null);
  };

  const getCurrentSelection = () => {
    const provider = getSelectedProvider();
    const model = getSelectedModel();
    const language = getSelectedLanguage();

    if (!provider || !model || !language) {
      return null;
    }

    return {
      providerName: provider.name,
      providerValue: provider.value,
      modelName: model.name,
      modelValue: model.value,
      languageName: language.name,
      languageValue: language.value,
    };
  };

  const isConfigChanged = () => {
    if (!savedConfig) return true;
    return (
      config.provider !== savedConfig.provider ||
      config.model !== savedConfig.model ||
      config.language !== savedConfig.language
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!sttData) {
    return (
      <div className="text-center text-muted-foreground">
        Failed to load STT configuration data.
      </div>
    );
  }

  const currentSelection = getCurrentSelection();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Agent Configuration</h2>
        <p className="text-muted-foreground">
          Configure your speech-to-text provider, model, and language settings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              STT Configuration
            </CardTitle>
            <CardDescription>
              Select your preferred speech-to-text provider and settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select value={config.provider} onValueChange={handleProviderChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  {sttData.stt.map((provider) => (
                    <SelectItem key={provider.value} value={provider.value}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select
                value={config.model}
                onValueChange={handleModelChange}
                disabled={!config.provider}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableModels().map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={config.language}
                onValueChange={handleLanguageChange}
                disabled={!config.model}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableLanguages().map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {message && (
              <div className={`p-3 rounded-md text-sm ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                  : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
              }`}>
                {message.text}
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                disabled={!config.provider || !config.model || !config.language}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Current Configuration
            </CardTitle>
            <CardDescription>
              Summary of your selected configuration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentSelection ? (
              <>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Provider</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{currentSelection.providerName}</Badge>
                      <span className="text-sm text-muted-foreground">({currentSelection.providerValue})</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">Model</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{currentSelection.modelName}</Badge>
                      <span className="text-sm text-muted-foreground">({currentSelection.modelValue})</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">Language</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{currentSelection.languageName}</Badge>
                      <span className="text-sm text-muted-foreground">({currentSelection.languageValue})</span>
                    </div>
                  </div>
                </div>

                {isConfigChanged() && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md dark:bg-yellow-900/20 dark:border-yellow-800">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Configuration has unsaved changes. Click "Save Configuration" to persist these settings.
                    </p>
                  </div>
                )}

                {savedConfig && !isConfigChanged() && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Configuration saved and ready to use.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select a provider, model, and language to see your configuration summary.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}