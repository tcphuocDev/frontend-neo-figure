import { useState } from 'react';
import {
  Bot,
  MessageCircle,
  Search,
  Database,
  FileText,
  Play,
  BarChart2,
  RefreshCw,
} from 'lucide-react';
import { agentApi } from '../../services/adminApi';

export default function AgentsDashboard() {
  const [activeTab, setActiveTab] = useState('shopping-assistant');
  const [loading, setLoading] = useState(false);

  // Shopping Assistant State
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId] = useState(`session-${Date.now()}`);

  // Product Discovery State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // Data Enrichment State
  const [productId, setProductId] = useState('');
  const [enrichmentResult, setEnrichmentResult] = useState(null);

  // Content Generation State
  const [contentProductId, setContentProductId] = useState('');
  const [contentType, setContentType] = useState('description');
  const [generatedContent, setGeneratedContent] = useState(null);

  const agents = [
    {
      id: 'shopping-assistant',
      name: 'Shopping Assistant',
      icon: MessageCircle,
      description: 'AI chatbot hỗ trợ khách hàng 24/7',
      color: 'primary',
    },
    {
      id: 'product-discovery',
      name: 'Product Discovery',
      icon: Search,
      description: 'Tìm kiếm thông minh với NLP',
      color: 'success',
    },
    {
      id: 'data-enrichment',
      name: 'Data Enrichment',
      icon: Database,
      description: 'Làm giàu dữ liệu sản phẩm',
      color: 'warning',
    },
    {
      id: 'content-generation',
      name: 'Content Generation',
      icon: FileText,
      description: 'Tạo nội dung tự động',
      color: 'danger',
    },
  ];

  // Shopping Assistant Functions
  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    setLoading(true);
    setChatHistory([...chatHistory, { role: 'user', content: chatMessage }]);
    setChatMessage('');

    try {
      const response = await agentApi.chat(sessionId, chatMessage);
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', content: response.response.content },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, an error occurred.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Product Discovery Functions
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await agentApi.intelligentSearch(searchQuery);
      setSearchResults(response);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Data Enrichment Functions
  const handleEnrichProduct = async () => {
    if (!productId.trim()) return;

    setLoading(true);
    try {
      const response = await agentApi.enrichProduct(productId);
      setEnrichmentResult(response);
    } catch (error) {
      console.error('Enrichment error:', error);
      alert('Failed to enrich product');
    } finally {
      setLoading(false);
    }
  };

  const handleBatchEnrich = async () => {
    setLoading(true);
    try {
      const response = await agentApi.batchEnrich(50);
      setEnrichmentResult(response);
    } catch (error) {
      console.error('Batch enrichment error:', error);
      alert('Failed to batch enrich');
    } finally {
      setLoading(false);
    }
  };

  // Content Generation Functions
  const handleGenerateContent = async () => {
    if (!contentProductId.trim()) return;

    setLoading(true);
    try {
      const response = await agentApi.generateContent(contentProductId, contentType);
      setGeneratedContent(response);
    } catch (error) {
      console.error('Content generation error:', error);
      alert('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const renderAgentContent = () => {
    switch (activeTab) {
      case 'shopping-assistant':
        return (
          <div className="space-y-sm">
            <div className="bg-dark-card p-md rounded-lg border border-[#2a2a2a]">
              <h3 className="text-heading-sm font-bold text-white mb-sm">Test Shopping Assistant</h3>

              {/* Chat History */}
              <div className="bg-dark rounded-lg p-sm mb-sm h-96 overflow-y-auto space-y-xs">
                {chatHistory.length === 0 ? (
                  <p className="text-text-secondary text-center">Start a conversation...</p>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-xs rounded-lg ${
                          msg.role === 'user' ? 'bg-primary text-dark' : 'bg-dark-card text-white'
                        }`}
                      >
                        <p className="text-body whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="flex items-center space-x-sm">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Nhập tin nhắn..."
                    className="flex-1 px-md py-sm bg-dark border border-[#2a2a2a] rounded-lg text-white focus:border-primary focus:outline-none"
                  disabled={loading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="px-md py-sm bg-primary text-dark font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? '...' : 'Send'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <div className="bg-dark-card p-sm rounded-lg border border-[#2a2a2a]">
                <p className="text-text-secondary text-body mb-xs">Session ID</p>
                <p className="text-white font-mono text-xs">{sessionId}</p>
              </div>
              <div className="bg-dark-card p-sm rounded-lg border border-[#2a2a2a]">
                <p className="text-text-secondary text-body mb-xs">Messages</p>
                <p className="text-white font-bold text-xl">{chatHistory.length}</p>
              </div>
            </div>
          </div>
        );

      case 'product-discovery':
        return (
          <div className="space-y-sm">
            <div className="bg-dark-card p-md rounded-lg border border-[#2a2a2a]">
              <h3 className="text-heading-sm font-bold text-white mb-sm">Intelligent Search</h3>

              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="VD: gundam dưới 1 triệu đánh giá cao"
                    className="flex-1 px-md py-sm bg-dark border border-[#2a2a2a] rounded-lg text-white focus:border-primary focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-md py-sm bg-primary text-dark font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? '...' : 'Search'}
                </button>
              </div>

              {searchResults && (
                <div className="space-y-sm">
                  <div className="bg-dark p-sm rounded-lg">
                    <h4 className="text-white font-bold mb-xs">Results</h4>
                    <p className="text-text-secondary text-body">
                      Found {searchResults.products?.length || 0} products in{' '}
                      {searchResults.metadata?.processingTime}ms
                    </p>
                  </div>

                  {searchResults.products && searchResults.products.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-xs">
                      {searchResults.products.slice(0, 4).map((product) => (
                        <div
                          key={product._id}
                          className="bg-dark p-xs rounded-lg flex items-center space-x-sm"
                        >
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1">
                              <p className="text-white text-body font-medium line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-primary text-body font-bold">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(product.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 'data-enrichment':
        return (
          <div className="space-y-sm">
            <div className="bg-dark-card p-md rounded-lg border border-[#2a2a2a]">
              <h3 className="text-heading-sm font-bold text-white mb-sm">Enrich Product Data</h3>

              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="Enter Product ID"
                    className="flex-1 px-md py-sm bg-dark border border-[#2a2a2a] rounded-lg text-white focus:border-primary focus:outline-none"
                />
                <button
                  onClick={handleEnrichProduct}
                  disabled={loading}
                  className="px-md py-sm bg-primary text-dark font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? '...' : 'Enrich'}
                </button>
              </div>

              <button
                onClick={handleBatchEnrich}
                disabled={loading}
                className="w-full px-md py-sm bg-warning/20 text-warning border border-warning/30 rounded-lg hover:bg-warning/30 transition-colors disabled:opacity-50 mb-sm"
              >
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Batch Enrich (50 products)
              </button>

              {enrichmentResult && (
                <div className="bg-dark p-sm rounded-lg space-y-sm">
                  {enrichmentResult.processed && (
                    <div className="text-white">
                      <p className="font-bold">Processed: {enrichmentResult.processed} products</p>
                    </div>
                  )}

                  {enrichmentResult.confidence && (
                    <div>
                      <p className="text-text-secondary text-body mb-xs">Confidence Score</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-dark-card rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{
                              width: `${enrichmentResult.confidence}%`,
                            }}
                          />
                        </div>
                        <span className="text-primary font-bold">
                          {enrichmentResult.confidence}%
                        </span>
                      </div>
                    </div>
                  )}

                  {enrichmentResult.suggestions && (
                    <div>
                      <p className="text-text-secondary text-body mb-xs">Suggestions</p>
                      <ul className="space-y-xs">
                        {enrichmentResult.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-white text-body flex items-start">>
                            <span className="text-primary mr-2">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 'content-generation':
        return (
          <div className="space-y-sm">
            <div className="bg-dark-card p-md rounded-lg border border-[#2a2a2a]">
              <h3 className="text-heading-sm font-bold text-white mb-sm">Generate Content</h3>

              <div className="space-y-sm">
                <div>
                  <label className="block text-text-secondary text-body mb-xs">Product ID</label>
                  <input
                    type="text"
                    value={contentProductId}
                    onChange={(e) => setContentProductId(e.target.value)}
                    placeholder="Enter Product ID"
                      className="w-full px-md py-sm bg-dark border border-[#2a2a2a] rounded-lg text-white focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-body mb-xs">Content Type</label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                      className="w-full px-md py-sm bg-dark border border-[#2a2a2a] rounded-lg text-white focus:border-primary focus:outline-none"
                  >
                    <option value="description">Full Description</option>
                    <option value="short-description">Short Description</option>
                    <option value="seo">SEO Metadata</option>
                    <option value="email">Email Content</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateContent}
                  disabled={loading}
                  className="w-full px-md py-sm bg-primary text-dark font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Content'}
                </button>
              </div>

              {generatedContent && (
                <div className="mt-4 bg-dark p-4 rounded-lg">
                  <h4 className="text-white font-bold mb-3">Generated Content</h4>
                  <div className="bg-dark-card p-4 rounded-lg">
                    <pre className="text-text-secondary text-sm whitespace-pre-wrap overflow-x-auto">
                      {generatedContent.content}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">AI Agents Dashboard</h2>
        <p className="text-text-secondary mt-1">Test and monitor AI agents performance</p>
      </div>

      {/* Agent Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <button
              key={agent.id}
              onClick={() => setActiveTab(agent.id)}
              className={`p-4 rounded-lg border transition-all text-left ${
                activeTab === agent.id
                  ? `bg-${agent.color}/20 border-${agent.color}`
                  : 'bg-dark-card border-[#2a2a2a] hover:border-primary/50'
              }`}
            >
              <Icon
                className={`w-8 h-8 mb-3 ${
                  activeTab === agent.id ? `text-${agent.color}` : 'text-primary'
                }`}
              />
              <h3 className="text-white font-bold mb-1">{agent.name}</h3>
              <p className="text-text-secondary text-xs">{agent.description}</p>
            </button>
          );
        })}
      </div>

      {/* Agent Content */}
      {renderAgentContent()}
    </div>
  );
}
