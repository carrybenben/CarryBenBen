// 行业内参类型定义
import { apiRequest } from '@/lib/queryClient';

export interface IndustryInsight {
  id: number;
  titleCn: string;
  titleEn: string;
  sourceCn: string;
  sourceEn: string;
  publishDate: string;
  readCount: number;
  linkUrl: string;
  isPremium: boolean;
}

// 获取热门行业内参函数 - 从服务器API获取数据
export async function fetchHotInsights(): Promise<IndustryInsight[]> {
  try {
    const response = await apiRequest('GET', '/api/industry-insights');
    const data = await response.json();
    
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error('Invalid response format from industry insights API:', data);
      throw new Error('Invalid response format from server');
    }
  } catch (error) {
    console.error('Error fetching industry insights:', error);
    // 发生错误时，可以返回空数组或重新抛出错误
    throw error;
  }
}

// 发送AI咨询消息并获取响应 - 连接到服务器API
export async function sendAiConsultationMessage(message: string): Promise<string> {
  try {
    const response = await apiRequest('POST', '/api/ai-consultation', { message });
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      console.error('AI consultation error:', data.message);
      throw new Error(data.message || 'Failed to get AI response');
    }
  } catch (error) {
    console.error('Error sending AI consultation message:', error);
    throw error;
  }
}

// 设置AI模型优先级
export async function setModelPriority(priority: 'auto' | 'api' | 'local' | 'fallback'): Promise<boolean> {
  try {
    const response = await apiRequest('POST', '/api/set-model-priority', { priority });
    const data = await response.json();
    
    if (data.success) {
      return true;
    } else {
      console.error('Error setting model priority:', data.message);
      return false;
    }
  } catch (error) {
    console.error('Error setting model priority:', error);
    return false;
  }
}

// 获取当前AI模型优先级
export async function getModelPriority(): Promise<string> {
  try {
    const response = await apiRequest('GET', '/api/get-model-priority');
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      console.error('Error getting model priority:', data.message);
      return 'auto'; // 默认返回自动模式
    }
  } catch (error) {
    console.error('Error getting model priority:', error);
    return 'auto'; // 默认返回自动模式
  }
}